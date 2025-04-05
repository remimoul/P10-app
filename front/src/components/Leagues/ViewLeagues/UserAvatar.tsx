import { RiUser3Fill } from "react-icons/ri";

const UserAvatar = ({
  avatarUrl,
  fullName,
}: {
  avatarUrl?: string;
  fullName?: string;
}) => {
  return avatarUrl ? (
    <img
      src={avatarUrl}
      alt={fullName || "User Avatar"}
      className="w-24 h-24 rounded-full object-cover border-2 border-red-500/30"
    />
  ) : (
    <RiUser3Fill className="text-4xl text-red-500" />
  );
};

export default UserAvatar;
