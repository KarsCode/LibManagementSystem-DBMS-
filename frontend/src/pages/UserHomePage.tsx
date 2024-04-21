import BorrowInput from '@/components/BookList/borrowinput'
import BooksList from '@/components/BookList/page'
import ProfileButton from '@/components/ProfileButton'


const HomePage = () => {

  
  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex w-[100vw] items-center justify-center font-bold text-2xl'>
          Book List
        </div>
        <div className='w-[10px]'>
          <ProfileButton/>
        </div>
      </div>

      <div className=''>
        <BooksList/>
      </div>

      <div>
        <BorrowInput/>
      </div>
     
    </div>
  )
}

export default HomePage
