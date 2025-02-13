
import NotificationCard from "@/src/components/NotificationCard";

interface Notification {
    title: String,
    description: String,
    createdAt: String
}
//props interface
interface Props {
    data: Notification[]
}



//component
const NotificationBlock = ({ data }: Props) => {




    //render
    return (
        <>
            <div>
                <div className="w-full ">
                    <div className="bg-white  px-1 md:px-2 xl:px-3 dark:bg-darkBgLight dark:text-white">
                        <div className="mt-7 overflow-x-auto w-full ">
                            <table className="w-full whitespace-nowrap ">
                                <tbody>
                                    {data?.map((item: any) => (
                                        <tr key={item?.id} className="w-full">
                                            <NotificationCard data={item} />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationBlock;
