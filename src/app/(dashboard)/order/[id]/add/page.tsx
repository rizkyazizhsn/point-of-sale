import AddOrderItem from "./_components/add-order-item";

export const metadata = {
  title: "My Cafe | Add Order Item",
}

const AddOrderItemPage = async ({ params } : { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <AddOrderItem id={id} />
  )
}

export default AddOrderItemPage