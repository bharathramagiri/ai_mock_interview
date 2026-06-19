import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Guest Account",
      credentials: {},
      async authorize() {
        // This automatically logs you in as a test user without needing real passwords or Google!
        return { 
          id: "1", 
          name: "Test Candidate", 
          email: "candidate@interview.co" 
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/interview`;
    },
  },
});

export { handler as GET, handler as POST };