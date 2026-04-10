import AppProvider from "@/app/provider";
import AppRouter from "@/app/routing/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
