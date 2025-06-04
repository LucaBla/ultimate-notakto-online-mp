# frozen_string_literal: true

#Redis.current = Redis.new(url:  ENV['REDIS_URL'],
#  port: ENV['REDIS_PORT'],
#  db:   ENV['REDIS_DB'])
require 'redis'

$redis = Redis.new(url: ENV["REDIS_URL"], ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE })
