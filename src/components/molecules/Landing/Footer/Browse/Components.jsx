import { Title } from "../../../../atoms/Title";

const Components = () => {
    const data = [
        { id: 1, name: 'Home' },
        { id: 2, name: 'Services' },
        { id: 3, name: 'About Us' },
    ];

    return (
        <div>
            <div className="pb-2">
                <Title variant="footerTitle" value="Browse" />
            </div>
            <ul>
                {data.map((item) => (
                    <li
                        key={item.id}
                        className="w-fit group transition-all duration-300 transform hover:translate-x-2 hover:text-blue-500"
                    >
                        <a href="" className="text-lg group-hover:font-bold font-medium">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Components;
