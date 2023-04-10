import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';

const UserView = () => {
  const router = useRouter()
  const { userId } = router.query
  console.log("userId : ", userId)
  const { data: fetchedUser, isLoading } = useUser(userId as string)
  console.log("fetchedUser : ", fetchedUser)
  // if (isLoading || !fetchedUser) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <ClipLoader color='#FF0000' size={80} />
  //     </div>
  //   )
  // }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name}/>
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
