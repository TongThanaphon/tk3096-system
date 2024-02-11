import { SignInForm } from '@/components/auth/SignInForm'
import { Separator } from '@/components/ui/separator'

const SignInPage = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <div className='rounded-md bg-white dark:bg-[#262626] px-7 py-10 w-1/4 shadow-md'>
        <h1 className='font-bold text-3xl text-center mb-3'>TK3096 System</h1>
        <Separator className='h-[2px] w-3/4 mx-auto my-8 bg-[#e1e2e5] dark:bg-neutral-700 rounded-full' />
        <SignInForm />
      </div>
    </div>
  )
}

export default SignInPage
