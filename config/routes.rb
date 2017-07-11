Rails.application.routes.draw do
  post "/process",  to: "portraits#process_image"
  get "/portrait", to: "portraits#index", as: "portrait"
end
