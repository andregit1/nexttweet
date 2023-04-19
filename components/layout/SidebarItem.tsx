import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string,
  href: string,
  icon: IconType,
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}

function SidebarItem({label, href, icon: Icon, onClick, auth, alert}: SidebarItemProps) {
  const { data: currentUser } = useCurrentUser()
  const router = useRouter()
  const loginModal = useLoginModal()

  const handleClick = useCallback(() => {
    if (onClick) return onClick()

    if (auth && !currentUser) loginModal.onOpen()

    if (href) router.push(href)
  }, [router, onClick, href, auth, currentUser, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-30 cursor-pointer lg:hidden">
        <Icon size={20} color='red'/>
        { alert ? <BsDot className='text-red-500 absolute -top-4 left-0' size={80} /> : null }
      </div>

      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-30 cursor-pointer">
        <Icon size={20} color='red'/>
        <p className="hidden lg:inline-block text-red-500 text-xl align-middle">
          {label}
        </p>
        { alert ? <BsDot className='text-red-500 absolute -top-4 left-0' size={80} /> : null }
      </div>
    </div>
  );
};

export default SidebarItem;
