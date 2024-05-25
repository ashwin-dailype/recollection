import { useMutation } from "@tanstack/react-query";

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
