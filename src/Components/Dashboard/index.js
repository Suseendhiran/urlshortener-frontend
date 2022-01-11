import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

import axios from "../../Api/Api";
import CreateUrl from "../CreateUrl";
import { urlSchema } from "../../helpers/validationSchema";
import Table from "../UrlsTable";
import { useAuth } from "../../Providers/AuthProvider";
import Spinner from "../Spinner";

function Index() {
  const { addToast } = useToasts();
  const { getUser } = useAuth();
  const { id, active } = getUser();
  const AXIOS = axios();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const INPUTS = [
    {
      name: "originalUrl",
      type: "text",
      inputType: "text",
      placeholder: "Shorten your link",
    },
  ];

  const handleCreateUrl = (values, resetForm) => {
    setLoading(true);
    AXIOS.post(`/shorturls`, {
      ...values,
    })
      .then((res) => {
        setLoading(false);
        resetForm();
        addToast(res.data.message, { appearance: "success" });
        getUrls();
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };

  const getUrls = () => {
    setLoading(true);
    AXIOS.get(`users/${id}`)
      .then((res) => {
        setUrls(res.data.urlsDetails);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div className="mt-26 pb-16">
      <CreateUrl
        validationSchema={urlSchema}
        handleLogin={handleCreateUrl}
        inputs={INPUTS}
        loading={loading}
        active={active}
      />
      {urls && urls.length ? (
        <Table urls={urls} loading={loading} />
      ) : loading ? (
        <h1 className="text-4xl font-semibold  mt-10">Loading...</h1>
      ) : (
        <h1 className="text-4xl font-semibold max-w-2xl mx-auto  mt-10">
          {!active
            ? "Mail has been sent to your email, Click that link to activate your account, then Logout and  try again"
            : "Try Adding Your URL"}
        </h1>
      )}
    </div>
  );
}

export default Index;
