import moment from "moment";

export default function useDates() {
  function formatDate(date: string) {
    return moment.utc(date).format("DD/MM/YYYY");
  }

  return {
    formatDate,
  };
}
