import { useTheme } from '../../context/ThemeContext';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-200">
        Calendiary
      </div>

      <div className="px-4 mt-4">
        <p className="text-sm text-gray-500 mb-2">
          테마 선택
        </p>
        <div className="flex flex-col gap-2">
          {['pink', 'blue', 'green', 'beige'].map(
            (color) => (
              <button
                key={color}
                onClick={() => setTheme(color as any)}
                className={`py-1 px-3 rounded text-left ${
                  theme === color
                    ? 'bg-gray-200 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {color}
              </button>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
