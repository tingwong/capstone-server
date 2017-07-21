Rails.application.routes.draw do
  root "portraits#index", as: "portrait"
  post "/process",  to: "portraits#process_image"
  get "/gallery", to: "portraits#gallery"
end
