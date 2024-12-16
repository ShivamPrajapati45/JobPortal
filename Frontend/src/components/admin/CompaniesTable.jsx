import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const CompaniesTable = () => {
    
    const { companies,searchInputText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies?.length > 0 && companies?.filter((company) => {
            if(!searchInputText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchInputText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies, searchInputText])

    return (
        <div className="overflow-x-auto max-h-[380px] border-t-2 border-orange-300 border-b-2 rounded-md">
            <Table className='w-full border-collapse bg-white'>
                <TableHeader className="bg-orange-200 sticky top-0 z-10  shadow-md uppercase ">
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Logo</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Name</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-left ">Date</TableHead>
                    <TableHead className="font-semibold text-lg py-3 px-4 text-right">Action</TableHead>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length <= 0 ? <tr>
                            <TableCell colSpan={4} className="py-6 text-center text-gray-500">
                                company Not Found
                            </TableCell>
                        </tr> :
                            (
                                <>
                                    {filterCompany?.length > 0 && filterCompany?.map((company, index) =>(
                                        <TableRow 
                                            key={index}
                                            className="hover:bg-gray-100 transition-colors border-b"
                                        >
                                            <TableCell className="font-semibold text-lg">
                                                    <Avatar>
                                                        <AvatarImage 
                                                            // src={`${company?.logo}`} 
                                                            src={`${company?.logo ? company?.logo : 'https://www.djibstyle.com/wp-content/uploads/2019/01/dummy-snapcode-avatar@2x-2.png' }`}
                                                        />
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="font-semibold text-lg">{company?.name}</TableCell>
                                                <TableCell className="font-semibold text-lg">{company?.createdAt.split("T")[0]}</TableCell>
                                                <TableCell className="font-semibold text-lg text-right cursor-pointer">
                                                    <Popover>
                                                        <PopoverTrigger
                                                            className="hover:scale-125 transition-all"
                                                        ><MoreHorizontal /></PopoverTrigger> {/* ye trigger he ispe click karne pe popover hoga */}
                                                        <PopoverContent className="w-20 text-center mr-10 bg-white p-0">
                                                            <Button onClick = {() => navigate(`/admin/companies/${company._id}`)} className="w-fit cursor-pointer bg-white flex items-center gap-2 hover:bg-gray-100 opacity-75">
                                                                <Edit2 />
                                                                <span>Edit</span>
                                                            </Button>
                                                        </PopoverContent>

                                                    </Popover>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable