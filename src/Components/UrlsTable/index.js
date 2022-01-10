import React from "react";
import Spinner from "../InlineSpinner";

function index({ urls, loading }) {
  return (
    <div className="flex flex-col mt-10 sm:px-8 lg:px-10">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full ">
          <div className="overflow-hidden">
            <table className="min-w-full ">
              <thead className="bg-white border-b">
                <tr
                  style={{ maxWidth: "1440px", margin: "auto" }}
                  className="px-8"
                >
                  <th
                    scope="col"
                    className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    Original Url
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    Short Url
                  </th>
                  <th
                    scope="col"
                    className="text-lg  font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody>
                {urls &&
                  urls.map((data, index) => {
                    return (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 px-8"
                        style={{ maxWidth: "1440px", margin: "auto" }}
                        key={index}
                      >
                        <td className="px-6 py-4  text-sm font-medium text-gray-900 text-left">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4  text-left break-all">
                          <a
                            href={data.originalUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data.originalUrl}
                          </a>
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4  text-left">
                          <a
                            href={data.shortUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {data.shortUrl}
                          </a>
                        </td>
                        <td className="text-sm text-gray-900 font-medium px-6 py-4  text-left">
                          {data.clicks}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && <Spinner className={"border-gray-800 w-8 h-8 mt-6"} />}
    </div>
  );
}

export default index;
