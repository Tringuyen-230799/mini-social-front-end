const UsersPage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {

  const { profileId } = await params;

  return <div>Users Page</div>;
};

export default UsersPage;
