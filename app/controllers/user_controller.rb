class UserController < ApplicationController
  
  def login
  end

  def authenticate
  	binding.pry
  	user = User.find_by(name: params['user']['user_name'])
  	if user && user.try(:authenticate, params['user']['password_digest'])
  		session[:user_id] = user.id
  		redirect_to '/listings/new'
  	else
  		redirect_to 'user/authenticate'
  	end
  end

end
