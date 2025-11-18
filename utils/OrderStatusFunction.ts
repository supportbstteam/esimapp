import { api } from "./ApiService";

/**
 * Continuously polls the backend for order completion every X seconds.
 * Stops automatically once the order reaches a final state.
 */
export const waitForOrderCompletion = async (
  transactionId: string,
  interval = 5000 // every 5 seconds
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let attempt = 0;

    const poll = async () => {
      attempt++;
      console.log(`📡 [Order Poll] Attempt #${attempt} — Checking status...`);

      try {
        const response: any = await api({
          url: `/user/orders/status/${transactionId}`,
          method: "GET",
        });

        console.log("----- response in the order after complte payment ----", response);

        const status = response?.status?.toUpperCase();
        // console.log(`📦 Order status: ${status}`);

        if (["COMPLETED", "PARTIAL", "FAILED"].includes(status)) {
          console.log(`✅ Order finalized with status: ${status}`);
          if (intervalId) clearInterval(intervalId);
          resolve(response);
        }
      } catch (err: any) {
        console.log("⌛ Order not ready yet, retrying...");
      }
    };

    // Start polling
    intervalId = setInterval(poll, interval);

    // Run first check immediately
    poll();

    // Cleanup safeguard if environment supports it (like Node)
    if (typeof process !== "undefined" && process.on) {
      process.on("exit", () => intervalId && clearInterval(intervalId));
    }
  });
};

/**
 * Continuously polls the backend for order completion every X seconds.
 * Stops automatically once the order reaches a final state.
 */
export const waitForOrderTopUpCompletion = async (
  transactionId: string,
  interval = 5000 // every 5 seconds
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let attempt = 0;

    const poll = async () => {
      attempt++;
      console.log(`📡 [Order Poll] Attempt #${attempt} — Checking status...`);

      try {
        const response: any = await api({
          url: `/user/top-up/status/${transactionId}`,
          method: "GET",
        });

        // console.log("----- response in the top up after complte payment ----", response);

        const status = response?.status?.toUpperCase();
        // console.log(`📦 Order status: ${status}`);

        if (["PENDING", "FAILED", "SUCCESS"].includes(status)) {
          // console.log(`✅ Order finalized with status: ${status}`);
          if (intervalId) clearInterval(intervalId);
          resolve(response);
        }
      } catch (err: any) {
        console.log("⌛ Order not ready yet, retrying...");
      }
    };

    // Start polling
    intervalId = setInterval(poll, interval);

    // Run first check immediately
    poll();

    // Cleanup safeguard if environment supports it (like Node)
    if (typeof process !== "undefined" && process.on) {
      process.on("exit", () => intervalId && clearInterval(intervalId));
    }
  });
};
