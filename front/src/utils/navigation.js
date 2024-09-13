import { useRouter } from 'next/router';

const useNavigation = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToMain = () => {
    router.push('/memo_list')
  }
  // 他のナビゲーション関数も必要に応じて追加

  return {
    navigateToLogin,
    navigateToRegister,
    navigateToMain,
  };
};

export default useNavigation;
