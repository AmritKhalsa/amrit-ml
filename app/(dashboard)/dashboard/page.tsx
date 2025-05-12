
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { verifySession } from "@/app/actions/sessions";

const menuItems = [
  {
    name: "X-axis",
    items: [
      { label: "New Tab", shortcut: "⌘T" },
      { label: "New Window" },
      { separator: true },
      { label: "Share" },
      { separator: true },
      { label: "Print" },
    ],
  },
  {
    name: "Y-axis",
    items: [
      { label: "New Tab", shortcut: "⌘T" },
      { label: "New Window" },
      { separator: true },
      { label: "Share" },
      { separator: true },
      { label: "Print" },
    ],
  },
  {
    name: "Generate",
    items: [
      { label: "Random" },
      { label: "New Window" },
      { separator: true },
      { label: "Share" },
      { separator: true },
      { label: "Print" },
    ],
  },
];
// useEffect(() => {
//   if (!canvasRef.current) return;
//   const canvas = canvasRef.current;
//   const context = canvas.getContext("2d");
//   if (!context) return;

//   // Clear the canvas
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // Initialize and draw the graph
//   var g = new graph(
//     context,
//     canvas.width,
//     canvas.height,
//     200,
//     1 / Size,
//     1 / 4,
//     1 / 4,
//   );
//   g.drawGrid();
//   g.createPoints(
//     [
//       [0, 0],
//       [1, 1],
//       [2, 4],
//       [3, 9],
//       [4, 16],
//     ],
//     "red",
//   );

  
//   g.drawFunction((x) => x ** 2, 500, "blue");

//   context.lineWidth = 1;
//   g == null;
//   return () => {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//   };
// }, [Size]);
export default async function Dashboard() {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [Size, setSize] = useState(1);

  const session = await verifySession();
  
  return (
    <div className="w-full p-5">
      <h1>hello</h1>
      {/* <div className=" border relative w-[802px] h-[500px] col-span-3">
        <Menubar className=" h-[40px] rounded-none">
          {menuItems.map(({ name, items }) => (
            <MenubarMenu key={name}>
              <MenubarTrigger>{name}</MenubarTrigger>
              <MenubarContent>
                {items.map((item, index) =>
                  item.separator ? (
                    <MenubarSeparator key={index} />
                  ) : (
                    <MenubarItem key={index}>
                      {item.label}{" "}
                      {item.shortcut && (
                        <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                      )}
                    </MenubarItem>
                  ),
                )}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
        <canvas ref={canvasRef} width={800} height="460" id="canvas"></canvas>
        <div className=" absolute bottom-0 right-0">
          <Button
            onClick={() => {
              setSize(Size / 2);
            }}
            className="m-2"
            variant="outline"
          >
            +
          </Button>
          <Button
            onClick={() => {
              setSize(Size * 2);
            }}
            className="m-2"
            variant="outline"
          >
            -
          </Button>
        </div>
      </div> */}
    </div>
  );
}
