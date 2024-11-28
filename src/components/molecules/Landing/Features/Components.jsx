const Components = ({imageSrc, title, description})=> {
    return(
        <div className="flex flex-col align-center w-[350px] overflow-hidden">
            <div className="bg-colorBlue rounded-full flex justify-center p-5 aspect-square">
                <img src={imageSrc} alt="" className=""/>
            </div>
            <h3 className="text-2xl font-bold pt-10">{title}</h3>
            <p className="text-gray-700 text-xl">{description}</p>
        </div>
    )
}
export default Components;