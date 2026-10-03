export interface EarlyAccessRequest {
  name: string;
  email: string;
  company: string;
  useCase: string;
  volume: string;
}

const requestQueue: Array<EarlyAccessRequest & { id: string; createdAt: string }> = [];
const MAX_DEMO_REQUESTS = 500;

export function enqueueEarlyAccessRequest(request: EarlyAccessRequest) {
  if (requestQueue.length >= MAX_DEMO_REQUESTS) {
    throw new Error("The demo request queue is full. Please contact Kavya Labs directly.");
  }
  const queued = {
    ...request,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  requestQueue.push(queued);
  return { id: queued.id };
}
