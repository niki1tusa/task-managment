import { Header } from "./header/Header";
import { Menu } from "./Menu";
import { Projects } from "./projects/Projects";

export const Sidebar = () => {
  return (
    <aside>
      <Header />
      <Menu title='Menu'/>
      <Projects/>
    </aside>
  );
};
