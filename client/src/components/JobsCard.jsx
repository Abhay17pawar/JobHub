import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';

const JobCard = ({title,company,salary,location,type,logo,jobLink}) => {
    return (
      <article className="w-full max-w-xs bg-white rounded-xl p-2 pb-0.5 text-gray-900 shadow-md">
        <section className="bg-orange-100 rounded-t-xl p-6 text-sm">
          <header className="flex justify-between items-center font-bold">
          <img src={logo}
            className='h-10 w-22'/>
          </header>
          <p className="mt-6 py-4 text-2xl font-semibold">{title}</p>
          <div className="text-gray-700">
            <a href={jobLink} target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto px-5 py-1 rounded-xl bg-gray-800 text-white text-lg font-medium hover:bg-gray-800">
                Apply
              </button>
            </a>
            </div>
        </section>
    <p className="mt-2 text-lg font-semibold mx-4 ">
        <WorkIcon/>
        {company}</p>
      
    <p className="mt-1 ml-4 text-lg font-semibold mx-3 ">
        {salary}</p>
    <p className="mt-1 text-lg font-semibold mx-3">
        <PlaceIcon/>{location}</p>
  <p className="mt-1 mx-4 text-lg font-semibold">
    <LaptopWindowsIcon/>{type}</p>
  <BookmarkAddIcon className='mx-60 mt-[-260px]' />
      </article>
    );
  };
  
  export default JobCard;
  