import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main.ts',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: { module: 'es2015', allowJs: 'false' },
      },
    }),
  ],
  output: {
    format: 'cjs',
    file: 'dist/bundle.js',
    sourcemap: true,
  }
};
