import BorrowsList from "@/components/BorrowedList/page"
import ReturnInput from "@/components/BorrowedList/returninput"


const UserProfile = () => {

  
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-2xl font-bold">
        Profile
      </div>

     
      <div className="flex flex-col items-start">
        Your Books:
        <BorrowsList/>
      </div>

      <div>
        <ReturnInput/>
      </div>
      
      
    </div>
  )
}

export default UserProfile
