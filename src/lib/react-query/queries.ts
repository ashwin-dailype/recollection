import {
  // useQuery,
  useMutation,
  // useQueryClient,
  // useInfiniteQuery,
} from "@tanstack/react-query";

// import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  signInAccount,

} from "@/lib/backend/api";
// ============================================================
// AUTH QUERIES
// ============================================================

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { authToken: string }) =>
      signInAccount(user),
  });
};
