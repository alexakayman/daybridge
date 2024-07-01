"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";

export default function PlaidLink({ user, variant }: PlaidLinkProps) {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      // const data = await createLinkToken(user);
      //   setToken(data?.linkToken)
    };
    getLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      //   await exchangePublicToken({
      //     publicToken: public_token,
      //     user,
      //   });
      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready}>
          Connect Bank 1
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank 2</Button>
      ) : (
        <Button>Connect Bank 3</Button>
      )}
    </>
  );
}
