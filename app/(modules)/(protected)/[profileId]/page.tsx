const UsersPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ profileId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const { profileId } = await params;

  return <div>Users Page</div>;
};

export default UsersPage;
