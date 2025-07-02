import Link from "next/link";

const Button = ({ link, text }: { link: string; text: string }) => {
  return (
    <>
      <Link
        href={link}
        className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
      >
        {text}
      </Link>
    </>
  );
};
export default Button;
