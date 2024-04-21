
import FinesList from '@/components/FineList/page'
const AdminHomePage = () => {
  return (
    <div className='flex flex-col items-center gap-24'>
        <div className='text-2xl font-bold'>
            Admin Dashboard
        </div>
        <div className='flex gap-10'>
            <div>
                <FinesList/>
            </div>

        </div>
      
    </div>
  )
}

export default AdminHomePage
