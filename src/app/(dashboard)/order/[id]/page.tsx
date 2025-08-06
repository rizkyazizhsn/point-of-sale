import DetailOrder from "./_components/detail-order";

export const metadata = {
  title: "My Cafe | Detail Order",
};

const DetailOrderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <DetailOrder id={id} />;
};

export default DetailOrderPage;
