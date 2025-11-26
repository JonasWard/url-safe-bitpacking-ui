// ToDo add parseBitsToBase64 method from url safe bitpacking

const base64url = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Method that convists a bitstring to a url safe base64 string
 * @param bits - `string` of 0 | 1
 * @returns `string` that represents the url safe base64 string
 */
export const parseBitsToBase64 = (bits: string): string => {
  // split the bits into 6 bit chunks
  const chunks = bits.match(/.{1,6}/g);
  // parse the chunks into numbers
  const numbers = chunks?.map((c) => Number.parseInt(c.padEnd(6, '0'), 2)) ?? [];
  // map the numbers to base64
  return numbers.map((n) => base64url.charAt(n)).join('');
};

export const BitDataRenderer: React.FC<{ bitstring: string | null; showBase64?: boolean }> = ({
  bitstring,
  showBase64 = false
}) => {
  return bitstring ? (
    <span className="grid grid-cols-[1fr_auto] gap-1">
      <p className="data">#{bitstring.length}</p>
      <p
        className="data truncate max-w-100 cursor-pointer hover:underline"
        onClick={() => navigator.clipboard.writeText(bitstring)}
      >
        {bitstring}
      </p>
      {showBase64 ? (
        <>
          <p className="data">#{parseBitsToBase64(bitstring).length}</p>
          <p
            className="data truncate max-w-100 cursor-pointer hover:underline"
            onClick={() => navigator.clipboard.writeText(parseBitsToBase64(bitstring))}
          >
            {parseBitsToBase64(bitstring)}
          </p>
        </>
      ) : null}
    </span>
  ) : (
    <span className="grid grid-cols-[1fr_auto] gap-1">
      <p className="data error">error</p>
      <p className="data error">...</p>
    </span>
  );
};
