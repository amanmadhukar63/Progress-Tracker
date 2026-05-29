

export const getGoals = async ({
  queryKey,
}: {
  queryKey: [string, number, number]
}) => {

  const [, limit, offset] = queryKey;
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/goal/get?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data;
};

export async function createGoal() {
}