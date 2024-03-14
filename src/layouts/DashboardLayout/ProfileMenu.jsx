import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { FaMarkdown, FaUser } from "react-icons/fa6";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const closeMenu = () => setIsMenuOpen(false);

    const profileMenuItems = [
        {
            label: "Profile",
            icon: FaUser,
            func: () => {
                closeMenu();
                return navigate("/dashboard/profile");
            },
        },
        {
            label: "Top Up",
            icon: FaUser,
            func: () => {
                closeMenu();
            },
        },
        {
            label: "Sign Out",
            icon: FaUser,
            func: () => {
                closeMenu();
                logOut();
            },
        },
    ];

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt={user?.displayName}
                        className="border border-green-700 p-0.5"
                        src={user?.photoURL}
                    />
                    <FaMarkdown
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1 border-2 border-green-500">
                {profileMenuItems.map(({ label, icon, func }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={func}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                    isLastItem ? "text-red-500" : "text-green-500"
                                }`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default ProfileMenu;
