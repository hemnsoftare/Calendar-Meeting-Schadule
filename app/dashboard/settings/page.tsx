import SettingsForm from "@/app/components/dashboard/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hook";
const getData = async (
  userId: string
): Promise<{ name: string; email: string; image: string }> => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        name: true,
        image: true,
      },
    });
    return data as {
      name: string;
      email: string;
      image: string;
    };
  } catch (error) {
    console.error("Database query error:", error);
    // Consider disconnecting and reconnecting to clear prepared statements
    // await prisma.$disconnect();
    // await prisma.$connect();
    throw error;
  }
};
const SettingsPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <SettingsForm
      email={data.email}
      fullName={data.name as string}
      profileImage={data.image as string}
    />
  );
};

export default SettingsPage;
