// context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

export type Theme = 'pink' | 'blue' | 'green' | 'beige';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'pink',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('pink');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
