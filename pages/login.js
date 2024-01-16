import { getProviders, signIn } from 'next-auth/react'; // Fix: Correcting the import
import React from 'react';

const Login = ({ providers }) => {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center '>
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}> {/* Fix: Adding a unique key for each provider */}
          <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className='bg-[#18D860] text-white p-5 rounded-full  '>
            Login With {provider?.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
