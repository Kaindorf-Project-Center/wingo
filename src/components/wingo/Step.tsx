const Step = (props: { number: number; title: string }) => {
  return (
    <div className="mt-8 mb-4 flex flex-row items-center">
      <div className="w-10 h-10 bg-indigo-500	 flex items-center justify-center rounded-full">
        <h1 className="text-2xl">{props.number}</h1>
      </div>
      <h1 className="ml-3 text-2xl">{props.title}</h1>
    </div>
  );
};

export default Step;
