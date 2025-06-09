type Props = {
  label: string;
  value: string | number;
};

export default function WalletInfo({ label, value }: Props) {
  return (
    <div className="border border-gray-300 rounded-md p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}
