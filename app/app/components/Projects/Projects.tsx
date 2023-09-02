import Project from './Project';

export default function Projects() {
  return (
    <div>

      <div>

          <h2 className='text-center text-2xl'> Some of my Projects </h2>

      </div>

      <div className='lg:w-[50%] m-auto grid grid-cols-1 md:grid-cols-1 justify-center gap-10 py-5 px-10'>
          <Project
              name='Mapper: A Graphics Library'
              desc="Mapper is a graphics library written purely in C++. Its main purpose it to generate animations and render videos in a beautiful and catchy way."
              project_url='https://github.com/PiCake314/BitMap'
              img_url='/Mapper.png'
          />

          <Project
              name='Monkey Code'
              desc="This is my submission for the T9 Hackathon. It was developed in 24 hours only! It's a game that times you on your coding speed. It was built using Flutter :)."
              project_url='https://github.com/PiCake314/MonkeyCode'
              img_url='/Monkey.png'
          />

      </div>
      
    </div>
  )
}
