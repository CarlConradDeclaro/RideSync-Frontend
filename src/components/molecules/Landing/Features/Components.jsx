const Components = ({imageSrc, title, description})=> {
    return(
        <div className="flex flex-col align-center justify-center overflow-hidden">
            <div className="bg-neutral-50 rounded-full flex justify-center p-5 aspect-square w-[150px] md:w-[250px] self-center">
                <img src={imageSrc} alt="" className=""/>
            </div>
            <h3 className="text-2xl font-bold pt-10 text-white">{title}</h3>
            <p className="text-white text-xl">{description}</p>
        </div>
    )
}
export default Components;