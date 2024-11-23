import {Title} from "../../../../atoms/Title"

const Components = ()=> {
    const data = [
        {id: 1, name: 'Ride-Sharing'},
        {id: 2, name: 'Carpool'}
    ]
    return(
    <div>
        <div className="pb-2">
            <Title variant="footerTitle" value="Services" />
        </div>
        <ul>
                {data.map((item) => (
                    <li
                        key={item.id}
                         className="group transition-all duration-300 transform hover:translate-x-2 hover:text-blue-500 w-fit"
                    >
                        <a href="" className="text-lg group-hover:font-bold font-medium">
                            {item.name}
                        </a>
                    </li>
                ))}
        </ul>
    </div>
    )
}
export default Components