import { createFileRoute } from "@tanstack/react-router";
import { handleAuthRequest, isGoogleOAuthConfigured } from "@/lib/auth.server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const action = new URL(request.url).pathname;
        if (action === "/api/auth/session" && !isGoogleOAuthConfigured()) {
          return Response.json(null);
        }
        return handleAuthRequest(request);
      },
      POST: ({ request }) => handleAuthRequest(request),
    },
  },
});
