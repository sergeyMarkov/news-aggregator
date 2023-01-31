import PreferencesDetails from "./PreferencesDetails";

export default interface DashboardDetails extends PreferencesDetails {
	searchText: string;
	searchDate: string;
	searchCategory: string;
}