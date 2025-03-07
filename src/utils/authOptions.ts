import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

// Define the expected response structure from the API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Define the structure of the JWT token
interface Token extends JWT {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

// Define the user object returned from the API
interface AuthenticatedUser extends User {
  id: string;
  email: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: string;
      name?: string;
    };
    accessToken?: string;
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
}

let isRegister = false;
let accountType = "customer";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials): Promise<AuthenticatedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.error("Login API request failed", response.status);
            return null;
          }

          const result: ApiResponse<{
            userId: string;
            accessToken: string;
            refreshToken: string;
            role: string;
          }> = await response.json();
          if (result.success && result.data) {
            return {
              id: result.data.userId,
              email: credentials.email,
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              role: result.data.role,
            };
          }

          console.error("Login failed:", result.message);
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        let finalUrl;

        // Ensure the URL is absolute
        if (url.startsWith("/")) {
          finalUrl = new URL(baseUrl + url); // Convert relative URL to absolute
        } else {
          finalUrl = new URL(url); // Already absolute, parse normally
        }

        // Extract query parameters
        const params = finalUrl.searchParams;
        const isRegisterParam = params.get("isRegister");
        accountType = params.get("accountType") || "customer";

        // Apply conditional logic
        if (isRegisterParam === "true") {
          isRegister = true;
          return finalUrl.href; // Redirect to modified URL
        } else {
          isRegister = false;
          return baseUrl; // Redirect to base URL
        }
      } catch (error) {
        console.error("Error parsing URL:", error);
        return baseUrl; // Fallback to base URL on error
      }
    },
    async jwt({ token, user, account, profile }): Promise<Token> {
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        try {
          const apiEndpoint = isRegister
            ? `${process.env.NEXT_PUBLIC_BASE_API}/auth/oauth-register`
            : `${process.env.NEXT_PUBLIC_BASE_API}/auth/oauth-login`;
          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile?.email,
              name: profile?.name,
              role: accountType,
            }),
          });

          if (!response.ok) {
            console.error("OAuth login API request failed", response.status);
            return {
              error: "OAuth login failed",
              accessToken: undefined,
              role: undefined,
            };
          }

          const data: ApiResponse<{ accessToken: string; role: string }> =
            await response.json();

          if (data.success && data.data) {
            return {
              accessToken: data.data.accessToken,
              role: data.data.role,
              email: profile?.email,
              name: profile?.name,
            };
          } else {
            console.error("OAuth login failed:", data.message);
            return {
              error: "OAuth login failed",
              accessToken: undefined,
              role: undefined,
            };
          }
        } catch (error) {
          console.error("OAuth login error:", error);
          return {
            error: "OAuth login error",
            accessToken: undefined,
            role: undefined,
          };
        }
      }

      // Handle CredentialsProvider login
      if (user) {
        const authenticatedUser = user as AuthenticatedUser;
        token.accessToken = authenticatedUser.accessToken;
        token.refreshToken = authenticatedUser.refreshToken;
        token.role = authenticatedUser.role;
        token.email = profile?.email;
        token.name = profile?.name;
      }

      const authenticatedUser = user as AuthenticatedUser;
      if (authenticatedUser) token.email = authenticatedUser.email;

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (token.error) {
        return { error: token.error, statusCode: 404 } as any;
      }

      session.user.id = token.sub as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
