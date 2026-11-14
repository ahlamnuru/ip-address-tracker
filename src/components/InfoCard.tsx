import { useIpInfo } from "../hooks/userIpInfo";
import type { IpInfo } from "../api/ipApi";

type ItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: ItemProps) {
  return (
    <div className="md:px-6 md:first:pl-0">
      <dt className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-medium break-words text-zinc-900 md:text-2xl">
        {value}
      </dd>
    </div>
  );
}

function getLocation(data: IpInfo) {
  const { city, region, postalCode } = data.location;
  const place = [city, region].filter(Boolean).join(", ");
  return `${place} ${postalCode}`.trim();
}

function InfoCard() {
  const { data, isLoading, isError, error } = useIpInfo();

  return (
    <section
      aria-label="IP address details"
      aria-busy={isLoading}
      className="rounded-2xl bg-white p-6 shadow-lg"
    >
      {isError ? (
        <p role="alert" className="text-center text-lg font-medium text-red-700">
          {error?.message}
        </p>
      ) : (
        <dl className="grid gap-6 text-center md:grid-cols-4 md:divide-x md:divide-zinc-300 md:text-left">
          <InfoItem
            label="IP Address"
            value={isLoading ? "Loading..." : (data?.ip ?? "-")}
          />
          <InfoItem
            label="Location"
            value={isLoading ? "Loading..." : data ? getLocation(data) : "-"}
          />
          <InfoItem
            label="Timezone"
            value={isLoading ? "Loading..." : data ? `UTC ${data.location.timezone}` : "-"}
          />
          <InfoItem
            label="ISP"
            value={isLoading ? "Loading..." : (data?.isp ?? "-")}
          />
        </dl>
      )}
    </section>
  );
}

export default InfoCard;