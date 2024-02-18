import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import LoadingPage from "@/components/LoadingPage";
import { useAuthStateChange } from "@/firebase/utils";

export default function App({ Component, pageProps }) {
  const [user, authStateLoading] = useAuthStateChange();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authStateLoading) {
      const isLoginPage = router.pathname === '/login';
      if (isLoginPage && user) {
        router.replace('/');
      } else if (!isLoginPage && !user) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    };
  }, [user, authStateLoading, router]);

  if (loading) return <LoadingPage />;

  return <Component {...pageProps} user={user} />;
}
